from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        """
        Find a user by email.
        """
        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        """
        Find a user by ID.
        """
        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    @staticmethod
    def create_user(db: Session, user: User):
        """
        Save a new user.
        """
        db.add(user)
        db.commit()
        db.refresh(user)
        return user