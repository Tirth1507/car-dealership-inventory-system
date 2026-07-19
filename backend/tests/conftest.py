import pytest

from fastapi.testclient import TestClient

from database import get_db
from main import app

from tests.test_database import (
    engine,
    Base,
    TestingSessionLocal,
)

Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture()
def client():

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    with TestClient(app) as client:
        yield client