def test_register_user(client):

    payload = {
        "first_name": "Kiara",
        "last_name": "Advani",
        "email": "kiara@gmail.com",
        "password": "Password@123",
        "confirm_password": "Password@123",
    }

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 201

    data = response.json()

    assert data["email"] == payload["email"]
    assert data["role"] == "customer"

def test_duplicate_email(client):

    payload = {
        "first_name": "Kiara",
        "last_name": "Advani",
        "email": "kiara@gmail.com",
        "password": "Password@123",
        "confirm_password": "Password@123",
    }

    client.post("/auth/register", json=payload)

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"


def test_password_mismatch(client):

    payload = {
        "first_name": "Kiara",
        "last_name": "Advani",
        "email": "kiara@gmail.com",
        "password": "Password@123",
        "confirm_password": "Password@456",
    }

    response = client.post("/auth/register", json=payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "Passwords do not match"


def test_login_success(client):

    register_payload = {
        "first_name": "Kiara",
        "last_name": "Advani",
        "email": "kiara@gmail.com",
        "password": "Password@123",
        "confirm_password": "Password@123",
    }

    client.post("/auth/register", json=register_payload)

    login_payload = {
        "email": "kiara@gmail.com",
        "password": "Password@123",
    }

    response = client.post("/auth/login", json=login_payload)

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_invalid_login(client):

    payload = {
        "email": "wrong@example.com",
        "password": "WrongPassword",
    }

    response = client.post("/auth/login", json=payload)

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"