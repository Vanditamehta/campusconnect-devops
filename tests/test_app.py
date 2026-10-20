import pytest

from app import app, database


@pytest.fixture
def client(tmp_path, monkeypatch):
    test_db = tmp_path / "test.db"
    monkeypatch.setattr(database, "DB_NAME", str(test_db))
    database.init_db()

    with app.test_client() as test_client:
        yield test_client


    database.DB_NAME = original_db_name


def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'CampusConnect' in response.data


def test_profile_creation_and_listing(client):
    payload = {
        'name': 'Alice Sharma',
        'headline': 'B.Tech DevOps Student',
        'skills': 'Python, Linux, Docker',
        'bio': 'Learning CI/CD and automation.'
    }

    create_response = client.post('/api/profile', json=payload)
    assert create_response.status_code == 201
    assert create_response.get_json()['message'] == 'Profile saved successfully'

    list_response = client.get('/api/profiles')
    assert list_response.status_code == 200
    profiles = list_response.get_json()
    assert len(profiles) == 1
    assert profiles[0]['name'] == 'Alice Sharma'
    assert profiles[0]['headline'] == 'B.Tech DevOps Student'
