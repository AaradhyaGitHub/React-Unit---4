// news file -> domain.com/news/news-detail
import {useRouter} from 'next/router'
export default function NewsDetail() {
  const router = useRouter();
  const newsDetail = router.query.newsDetail
  //send request to backend API -> fetch newsItem with newsId
  
  return (
    <>
      <h1>This is the news details page</h1>
    </>
  );
}
