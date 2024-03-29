import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from './RecommendedUserFavoriteIcon';

// ユーザー情報を保持する型を定義します。
type User = {
    id: string;
    name: string;
    imageUrl: string;
    good: boolean;
    title: string;
};

// test用データ
const testusers: User[] = [
    { id: '001', name: 'Sample User ', imageUrl: '/images/TestUser1.jpeg', good: false, title: '四谷物産 課長'},
    { id: '002', name: '四谷 太郎', imageUrl: '/images/TestUser2.jpeg', good: false, title: 'Yahoo! Japan 第四営業部部長'},
    { id: '003', name: '四谷　太郎', imageUrl: '/images/TestUser3.jpeg', good: false, title: 'Splunk Service合同会社 CustomerSuccessManager'},
    { id: '004', name: '木内 亮', imageUrl: '/images/TestUser4.jpeg', good: false, title: '東京大学 学生'},
    { id: '005', name: '山本 太郎', imageUrl: '/images/TestUser5.jpeg', good: false, title: 'NEC Corporation SI営業部 主任'},
    { id: '006', name: '佐藤 佳代', imageUrl: '/images/TestUser6.jpeg', good: false, title: 'material-Design 主任'},
    { id: '007', name: '森澤 京佑', imageUrl: '/images/TestUser7.jpeg', good: false, title: 'Splunk Service合同会社 TechnicalSuccess'},
    { id: '008', name: '鈴木 大輔', imageUrl: '/images/TestUser8.jpeg', good: false, title: 'Splunk Service合同会社 TechnicalSuccess'},
    { id: '009', name: 'Amanda ONiel', imageUrl: '/images/TestUser9.jpeg', good: false, title: 'Splunk Service合同会社 TechnicalSuccess'},
    { id: '010', name: 'Nick Middle', imageUrl: '/images/TestUser10.jpeg', good: false, title: 'Splunk Service合同会社 TechnicalSuccess'},
];

function RecommendedUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [page] = useState(1); // ページネーションの現在のページ

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/service/recousers/', {
            page: page,
          });
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching recommended users:', error);
          // debug for local environment
          setUsers(testusers);
        }
      };
  
      fetchData();
    }, [page]);
  
    return (
        <Grid container spacing={3}>
            {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card>
                    <CardActionArea component={Link} to={`/user/detail/${user.id}`} >
                      <CardMedia
                      component="img"
                      height="200"
                      image={user.imageUrl}
                      alt={user.title}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                            {user.name} 
                            <br></br>
                            {user.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <FavoriteIcon />
                  </Card>
                </Grid>
            ))}
        </Grid>
    );
};
  

export default RecommendedUsers;

