FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /api

RUN pip install django-cors-headers psycopg2

COPY . .

EXPOSE 8000