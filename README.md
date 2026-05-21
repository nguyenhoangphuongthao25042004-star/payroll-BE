## Cách Khởi tạo dự án ##
1. Tải package.json (npm init -y)
2. Tải gói express để xây dựng web (npm install express) 
3. Tải Typescript và các kiểu TS cho express (npm install -D typescript ts-node-dev @types/node @types/express)
4. Tải file tsconfig (npx tsc --init)
5. Cấu hình cho các file tsconfig , package.json

## Chạy dự án : npm run dev

## Dependence và devDependence
- Dependence : là nơi chứa các thư viện bổ trợ có thể sử dụng cho khi ra hệ thống thực tế
- devDependence : là nơi chứa các thư viện bổ trợ cho lập trình

## Cách cho dự án chạy realtime mỗi khi có sự thay đổi code 
- Thông qua 2 gói : nodemon , ts-node
- ts-node giúp bỏ qua cái biên dịch từ ts -> js thông qua cái gói Typescipt,
mà nó sẽ chạy thông qua ts-node 
- npm install -D nodemon ts-node ts-node-dev
- Cấu hình nodemon trong package.json
 "nodemonConfig": {
    "watch": ["src"], để biết khi có sự thay đổi code trong thư mục src thì nó sẽ chạy lại
    "ext": "ts",  theo dõi file nào là ts
    "ignore": ["node_modules"], không quan sát thư mục node_modules
    "exec": "ts-node ./src/index.ts" cách chạy của nodemon
  },

=> "dev": "tsc && node dist/index.js" => cách này là biên dịch ra js rồi mới hiển thị khi có thay đổi thì phải chạy lại cái lệnh này để biên dịch 

=> "dev": "nodemon"  => cách này chạy mà không cần biên dịch code 


## Cài dotenv
- npm i dotenv để cài đặt cấu hình thông số 

## req.body : data từ phía client gửi lên server
## Có setup debug code

## Set up posgre với node.js
- Tải : npm install pg
- Do pg có kiểu DT nên tải thêm 1 gói cho TS : npm install -D  @types/pg  
- thông số kết nối db ở file .env

## Set up prisma 
- npm install prisma @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg
trong đó : 
      prisma : là giúp chạy các lệnh như prisma init, ...
      @prisma/client : thư viện giúp truy vấn đến CSDL
      @prisma/adapter-pg : là driver adapter của Prisma dành cho PostgreSQL, dùng để kết nối Prisma Client với database thông qua thư viện pg (node-postgres).

## Cài đặt thư viện hashpassword = bcrypt

## Cách chạy khi kéo dự án về 
1. npm install
2. chỉnh các thông số trong .env
3. npx prisma migrate dev
4. npx prisma generate
