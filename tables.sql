drop table waiters_shifts;
drop table weekly_days;
drop table waiters_names;

create table weekly_days(
    id serial not null primary key,
    days_bookings text not null
);

create table waiters_names(
    id serial not null primary key,   
    names text not null
);

create table waiters_shifts(
    id serial not null primary key,
    days_id int not null,
    waiters_id int not null, 
    foreign key (days_id ) references weekly_days (id),
    foreign key (waiters_id) references waiters_names (id)
);

 Insert into weekly_days(days_bookings)
 values ('Sunday');

Insert into weekly_days(days_bookings)
 values ('Monday');

Insert into weekly_days(days_bookings)
 values ('Tuesday');

Insert into weekly_days(days_bookings)
 values ('Wednesday');

Insert into weekly_days(days_bookings)
 values ('Thursday');

Insert into weekly_days(days_bookings)
 values ('Friday');

Insert into weekly_days(days_bookings)
 values ('Saturday');


Insert into waiters_names(names)
values('Tello');

Insert into waiters_shifts(waiters_id,days_id)
values(1, 1);

Insert into waiters_shifts(waiters_id,days_id)
values(1, 2);


-- weekly_days table
-- id |   days_bookings   
-- ----+-----------
--   1 | Monday
--   2 | Tuesday
--   3 | Wednesday
--   4 | Thursday
--   5 | Friday
--   6 | Saturday
--   7 | Sunday
-- (7 rows)

    

-- waiters_names table
-- id |  names  
-- ----+---------
--   1 | Tau
--   2 | Hlantsi
--   3 | Quinton
--   4 | Hloni
--   5 | Tello
-- (5 rows)

-- waiters_shifts table
-- id | days_id | waiters_id 
-- ----+---------+------------
--   1 | 1       | 2
--   2 | 1       | 1
--   3 | 2       | 3
--   4 | 3       | 1
--   5 | 7       | 4
--   6 | 3       | 4
--   7 | 2       | 4
--   8 | 7       | 5
--   9 | 1       | 5
--  10 | 3       | 5
--  11 | 4       | 2
-- (11 rows)







-- joined table
--   days    |  names  
-- -----------+---------
--  Monday    | Tau
--  Tuesday   | Hlantsi
--  Wednesday | Quinton
--  Thursday  | Hloni
--  Friday    | Tello
-- (5 rows)














