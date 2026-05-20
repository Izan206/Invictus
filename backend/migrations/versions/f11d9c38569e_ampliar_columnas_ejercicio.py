"""ampliar_columnas_ejercicio

Revision ID: f11d9c38569e
Revises: 9ce3e837fee4
Create Date: 2026-05-20 18:35:31.578121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f11d9c38569e'
down_revision = '9ce3e837fee4'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('ejercicio', 'nombre', existing_type=sa.String(length=50), type_=sa.String(length=255))
    op.alter_column('ejercicio', 'maquina', existing_type=sa.String(length=50), type_=sa.String(length=255))
    op.alter_column('ejercicio', 'grupo_muscular', existing_type=sa.String(length=50), type_=sa.String(length=255))

def downgrade():
    op.alter_column('ejercicio', 'nombre', existing_type=sa.String(length=255), type_=sa.String(length=50))
    op.alter_column('ejercicio', 'maquina', existing_type=sa.String(length=255), type_=sa.String(length=50))
    op.alter_column('ejercicio', 'grupo_muscular', existing_type=sa.String(length=255), type_=sa.String(length=50))