userRouter.use(connectToMysql)
userRouter.get(printUser)
userRouter.post(connectToMysql, sendWelcomeEmail, saveUser)
userRouter.use(disconnectFromMysql)