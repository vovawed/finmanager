FROM python:3.6

# python dependencies
COPY ./requirements.txt /
RUN pip install -r ./requirements.txt

# upload scripts
COPY ./scripts/entrypoint.sh ./scripts/gunicorn.sh ./scripts/start.sh /


RUN ["chmod", "+x", "/entrypoint.sh"]
RUN ["chmod", "+x", "/start.sh"]
RUN ["chmod", "+x", "/gunicorn.sh"]

WORKDIR /app