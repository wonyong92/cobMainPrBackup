--create alias if not exists ft_init for "org.h2.fulltext.fulltext.init";
--call ft_init();
--call ft_drop_index('public', 'rent_post');
--call ft_create_index('public', 'rent_post', 'rent_post_name');

insert into category(name) values('인기리스트');

insert into category(name) values('수입명품');

insert into category(name) values('캠핑용품');

insert into category(name) values('카메라/캠코더');

insert into category(name) values('음향/음반');

insert into category(name) values('리빙/생활');

insert into category(name) values('레져/여행');

insert into category(name) values('유아동');

insert into category(name) values('뷰티');

insert into category(name) values('게임');

insert into category(name) values('도서/문구');

insert into category(name) values('반려동물');


insert into location(name) values('서울');
insert into location(name) values('인천');
insert into location(name) values('경기');
insert into location(name) values('강원');
insert into location(name) values('대전');
insert into location(name) values('세종');
insert into location(name) values('전북');
insert into location(name) values('전남');
insert into location(name) values('부산');
insert into location(name) values('경북');
insert into location(name) values('경남');
insert into location(name) values('제주');

