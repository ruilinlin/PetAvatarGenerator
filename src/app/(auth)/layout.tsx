interface AuthLayoutProps {
  children: React.ReactNode;
}


const AuthLayout = ({children} : AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 简洁的顶部导航栏 */}
      <nav className='flex justify-between items-center bg-gray-100 p-4 shadow-sm'>
        <div className="font-bold text-xl">Image AI</div>
      </nav>
      
      {/* 主要内容区域 - 居中显示登录/注册卡片 */}
      <div className='flex-1 flex items-center justify-center bg-gray-50 p-4'>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      {/* 简单的页脚 */}
      <footer className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Image AI. All rights reserved.
      </footer>
    </div>
  )
};

export default AuthLayout;
