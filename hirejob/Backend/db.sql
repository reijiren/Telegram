create table users(
    id serial primary key,
    name varchar(20),
    email varchar(40),
    phone varchar(14),
    password text,
    job_title varchar(40),
    city varchar,
    user_type integer, -- 0 pekerja, 1 perekrut
    photo text,
    bg_photo text,
    instagram varchar(30),
    github varchar(30),
    gitlab varchar(30),
    linkedin varchar(30),
    description text,
    date_created date
);

create table workers(
    id integer primary key references users(id) on delete cascade,
    job_type varchar(40),
    skill text
);

create table recruiters(
    id integer primary key references users(id) on delete cascade,
    company_name varchar(50),
    position varchar(40),
    company_field varchar(20)
);

create table portofolio(
    id_porto serial primary key,
    id_user integer references workers(id) on delete cascade,
    app_title varchar(30),
    image text,
    link text,
    type integer, --0 mobile, 1 web
    date_created date
);

create table job_experience(
    id_exp serial primary key,
    id_user integer references workers(id) on delete cascade,
    title varchar(30),
    company varchar(50),
    date_in date,
    date_out date,
    jobdesk text,
    date_created date
);