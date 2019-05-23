FROM python:3.6

# python dependencies
COPY ./requirements.txt /
RUN pip install -r ./requirements.txt

# upload scripts
COPY ./scripts/entrypoint.sh ./scripts/gunicorn.sh /


RUN ["chmod", "+x", "/entrypoint.sh"]

WORKDIR /app