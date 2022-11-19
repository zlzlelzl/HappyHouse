# %%
import time
import pymysql
import random

con = pymysql.connect(host='localhost', user='ssafy', password='ssafy',
                      db='ssafyvue', charset='utf8',
                      autocommit=True)
cur = con.cursor()

# %%
s = time.process_time()

for _ in range(int(1e3)):
    # sql = "select * from board"

    sql = f"insert into qna(parentno, userid,subject,content) values({random.randint(0,_)},'ssafy','2','3')"
    cur.execute(sql)

    # 데이타 Fetch
    # rows = cur.fetchall()
e = time.process_time()
print(e-s)

# %%
