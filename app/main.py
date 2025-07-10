from fastapi import FastAPI
from . import routes


app = FastAPI(title="Yuvakarshan Backend")

app.include_router(routes.router)
