// 这个页面使用 SSR
export async function getServerSideProps() {
  // 获取动态数据
  return {
    props: {
      // 动态数据
    }
  };
}

export default function DynamicPage(props) {
  return (
    // 渲染动态内容
  );
} 