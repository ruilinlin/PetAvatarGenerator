import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/loginButton";
export default function Home() {
  return (
    <div>
      <LoginButton mode='redirect'>
      <Button variant="primary" size="sm">login</Button>
      </LoginButton>

    </div>
  )

}
