
create table `member` (
  `member_id` int primary key auto_increment,
  `login_id` varchar(25) unique not null,
  `password` varchar(25) not null,
  `email` varchar(50) unique not null,
  `nickname` varchar(25) unique not null,
  `profile_image_id` int,
  `created_at` datetime,
  `name` varchar(50)
);

create table `rent_post` (
  `rent_post_id` int primary key auto_increment,
  `rent_post_contents` varchar(255) not null,
  `rent_post_name` varchar(50) not null,
  `writer_id` int,
  `write_date` datetime,
  `update_date` datetime,
  `rent_status` boolean default false,
  `category` varchar(100),
  `location` varchar(100),
  `rent_price` int,
  `view_count` int
);

create table `picture` (
  `picture_id` int primary key auto_increment,
  `file_name` varchar(100),
  `rent_post_id` int
);

create table `comment` (
  `comment_id` int primary key auto_increment,
  `comment_contents` varchar(1000),
  `write_date` datetime,
  `update_date` datetime,
  `writer_id` int,
  `target_post_id` int
);

create table `login` (
  `login_id` int primary key auto_increment,
  `member_id` int,
  `token` text ,
  `last_login_date` datetime,
  `logout_date` datetime,
  `logouted` boolean default false
);

create table `rent_history` (
  `rent_history_id` int primary key auto_increment,
  `target_member_id` int,
  `rent_data_type` boolean default false,
  `rent_status` varchar(100),
  `rent_start_date` datetime,
  `rent_end_date` datetime,
  `requester_id` int,
  `msg` varchar(200),
  `target_post_id` int,
  `created_time` datetime,
  `update_time` datetime,
  `relate_rent_history` int
);

create table `category`(
`cid` int primary key auto_increment,
`name` varchar(100)
);

create table `location`(
`lid` int primary key auto_increment,
`name` varchar(100)
);

alter table `member` add foreign key (`profile_image_id`) references `picture` (`picture_id`);

alter table `rent_post` add foreign key (`writer_id`) references `member` (`member_id`);

alter table `picture` add foreign key (`rent_post_id`) references `rent_post` (`rent_post_id`);

alter table `comment` add foreign key (`writer_id`) references `member` (`member_id`);

alter table `comment` add foreign key (`target_post_id`) references `rent_post` (`rent_post_id`);

alter table `login` add foreign key (`member_id`) references `member` (`member_id`);

alter table `rent_history` add foreign key (`target_member_id`) references `member` (`member_id`);

alter table `rent_history` add foreign key (`requester_id`) references `member` (`member_id`);

alter table `rent_history` add foreign key (`target_post_id`) references `rent_post` (`rent_post_id`);

alter table `rent_history` add foreign key (`relate_rent_history`) references `rent_history` (`rent_history_id`);
