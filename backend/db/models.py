from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Float
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    organization = relationship('Organization', back_populates='users')

class Organization(Base):
    __tablename__ = 'organizations'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    users = relationship('User', back_populates='organization')
    projects = relationship('Project', back_populates='organization')

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    organization = relationship('Organization', back_populates='projects')

class Node(Base):
    __tablename__ = 'nodes'
    id = Column(Integer, primary_key=True)
    x = Column(Float)
    y = Column(Float)
    z = Column(Float)
    project_id = Column(Integer, ForeignKey('projects.id'))

class Element(Base):
    __tablename__ = 'elements'
    id = Column(Integer, primary_key=True)
    node_start_id = Column(Integer, ForeignKey('nodes.id'))
    node_end_id = Column(Integer, ForeignKey('nodes.id'))
    section_id = Column(Integer, ForeignKey('sections.id'))
    material_id = Column(Integer, ForeignKey('materials.id'))
    project_id = Column(Integer, ForeignKey('projects.id'))

class Material(Base):
    __tablename__ = 'materials'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(String)
    properties = Column(String)

class Section(Base):
    __tablename__ = 'sections'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(String)
    properties = Column(String)

class Load(Base):
    __tablename__ = 'loads'
    id = Column(Integer, primary_key=True)
    type = Column(String)
    magnitude = Column(Float)
    node_id = Column(Integer, ForeignKey('nodes.id'))
    element_id = Column(Integer, ForeignKey('elements.id'))

class Analysis(Base):
    __tablename__ = 'analyses'
    id = Column(Integer, primary_key=True)
    type = Column(String)
    status = Column(String)
    project_id = Column(Integer, ForeignKey('projects.id'))
    started_at = Column(DateTime)
    completed_at = Column(DateTime)

class Design(Base):
    __tablename__ = 'designs'
    id = Column(Integer, primary_key=True)
    type = Column(String)
    status = Column(String)
    project_id = Column(Integer, ForeignKey('projects.id'))
    created_at = Column(DateTime)

class Result(Base):
    __tablename__ = 'results'
    id = Column(Integer, primary_key=True)
    analysis_id = Column(Integer, ForeignKey('analyses.id'))
    data = Column(String) 