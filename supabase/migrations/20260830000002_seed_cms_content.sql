-- Preserve the content that was previously hard-coded in src/data/*.ts.
-- ON CONFLICT makes this safe to re-run.
insert into public.sermons (id,title,speaker,date,category,scripture,description,image_url,youtube_id,audio_url,notes_url,featured,published)
values
('00000000-0000-4000-8000-000000000001','The Grace That Finds You','Pastor David Okoye','2026-07-12','Grace','Ephesians 2:8–9','No matter how far you’ve wandered, God’s grace is already on its way to meet you where you are.','https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800','dQw4w9WgXcQ','#','#',true,true),
('00000000-0000-4000-8000-000000000002','Belonging Before Believing','Pastor Sarah Okoye','2026-07-05','Community','Romans 15:7','We explore what it means to welcome others the way Christ welcomed us — fully and unconditionally.','https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800','dQw4w9WgXcQ','#','#',false,true),
('00000000-0000-4000-8000-000000000003','Faith That Moves Mountains','Pastor Michael Adeyemi','2026-06-28','Faith','Matthew 17:20','A message on the power of even the smallest seed of faith when planted in God’s promises.','https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800','dQw4w9WgXcQ','#','#',false,true),
('00000000-0000-4000-8000-000000000004','The Heart of Worship','Pastor Grace Bello','2026-06-21','Worship','John 4:23–24','True worship is not about a song but about a life surrendered to the Father.','https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800','dQw4w9WgXcQ','#','#',false,true),
('00000000-0000-4000-8000-000000000005','Hope in the Hard Seasons','Pastor David Okoye','2026-06-14','Hope','Romans 5:3–5','How to hold on to hope when life feels uncertain, and why suffering produces endurance.','https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800','dQw4w9WgXcQ','#','#',false,true),
('00000000-0000-4000-8000-000000000006','Love That Never Fails','Pastor Sarah Okoye','2026-06-07','Love','1 Corinthians 13:8','A deep dive into the enduring nature of God’s love and how we are called to reflect it.','https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800','dQw4w9WgXcQ','#','#',false,true)
on conflict (id) do nothing;

insert into public.events (id,title,date,end_date,time,location,description,image_url,category,registration_required,registration_enabled,published)
values
('10000000-0000-4000-8000-000000000001','Summer Worship Night','2026-08-15',null,'7:00 PM','TNC Main Auditorium','An evening of uninterrupted worship, prayer, and communion. All are welcome to join us as we seek God’s presence together.','https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800','Worship',false,false,true),
('10000000-0000-4000-8000-000000000002','Family Conference 2026','2026-09-20','2026-09-22','9:00 AM','TNC Main Auditorium','A three-day conference for families and couples featuring guest speakers, workshops, and fellowship.','https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800','Conference',true,true,true),
('10000000-0000-4000-8000-000000000003','Youth Night: Unstoppable','2026-08-02',null,'6:30 PM','TNC Youth Hall','A high-energy night for teens with games, live music, and a powerful message. Bring a friend!','https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=800','Youth',true,true,true),
('10000000-0000-4000-8000-000000000004','Women’s Brunch & Fellowship','2026-08-09',null,'10:00 AM','TNC Fellowship Hall','A morning of food, friendship, and faith. Our guest speaker will share on finding identity in Christ.','https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=800','Women',true,true,true),
('10000000-0000-4000-8000-000000000005','Men’s Breakfast','2026-08-08',null,'8:00 AM','TNC Fellowship Hall','Men gather for a hearty breakfast, real conversation, and a short devotional. Newcomers always welcome.','https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800','Men',false,false,true),
('10000000-0000-4000-8000-000000000006','Community Outreach Day','2026-08-30',null,'11:00 AM','City Centre Plaza','Join us as we serve our city with free food, clothing, medical check-ups, and prayer.','https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800','Outreach',true,true,true)
on conflict (id) do nothing;

insert into public.gallery_items (id,type,title,category,image_url,published)
values
('20000000-0000-4000-8000-000000000001','photo','Sunday Worship Service','Services','https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000002','photo','Community Outreach','Outreach','https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000003','photo','Youth Conference','Conferences','https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000004','photo','Women’s Fellowship','Fellowship','https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000005','photo','Baptism Sunday','Services','https://images.pexels.com/photos/8434631/pexels-photo-8434631.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000006','photo','Choir Performance','Worship','https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000007','photo','Prayer Meeting','Fellowship','https://images.pexels.com/photos/8108065/pexels-photo-8108065.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000008','photo','Kids Ministry','Fellowship','https://images.pexels.com/photos/8434631/pexels-photo-8434631.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000009','photo','Conference Stage','Conferences','https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000010','photo','Worship Night','Worship','https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000011','photo','Outreach Food Drive','Outreach','https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',true),
('20000000-0000-4000-8000-000000000012','photo','Young Adults Gather','Fellowship','https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800',true)
on conflict (id) do nothing;
