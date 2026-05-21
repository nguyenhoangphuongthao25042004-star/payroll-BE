// cách ghi import này của TS 
import express from 'express'; // Import thư viện express để tạo server 
import 'dotenv/config' ;
import authRoutes from './routes/authRoutes';
import nhanVienRoutes from './routes/nhanvienRoutes';
import cors from 'cors';


const app = express();  // Khai báo đối tượng app từ express

const PORT = process.env.PORT || 4000; // Khai báo PORT dùng cho server

app.use(cors({
    origin: 'http://localhost:5173', // Cổng mặc định của React Vite
    credentials: true // Cho phép truyền token/cookie
}));

// Cấu hình cho req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình cho routes
authRoutes(app);
nhanVienRoutes(app);



app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})
