# /*
#  * LC Buddy
#  * Copyright (c) 2026 Prakhar Singh Chauhan
#  *
#  * Author: Prakhar Singh Chauhan
#  * Project: LC Buddy
#  *
#  * This file is part of the LC Buddy project.
#  *
#  * Unauthorized copying, modification, distribution, or use of this
#  * software without permission is prohibited.
#  *
#  * This project is maintained as an open-source initiative.
#  */


from fastapi import FastAPI
from app.database import Base, engine

from app.routes.ai_routes import router

from app.models import session_model
from app.models import message_model


app = FastAPI(title="LC Buddy Backend")

Base.metadata.create_all(bind=engine)

app.include_router(router)