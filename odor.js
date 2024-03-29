const express         = require('express');
const cookieParser    = require('cookie-parser');
const morgan          = require('morgan');
const path            = require('path');
const session         = require('express-session');
const dotenv          = require('dotenv');

dotenv.config();
const indexRouter     = require('./routes');
const {sequelize}     = require('./models');
const { application } = require('express');

const app = express();

app.set('port', process.env.PORT || 3001);

sequelize.sync({ force: false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(`연결실패 - ${err}`);
    });

app.use(morgan('dev'));
app.use('/img', express.static(path.join(__dirname, 'image')));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

//
app.use('/', indexRouter);

//
app.use((req, res, next) => {
    const error = new Error('${req.method} ${req.url} 라우터가 없습니다.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({result:false, data:"Invalid router"});
});

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(app.get('port'), '번 포트에서 HTTP 통신 대기 중');
});