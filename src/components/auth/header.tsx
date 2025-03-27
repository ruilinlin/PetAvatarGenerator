import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface HeaderProps{
  label: string;

}
const Header = ({label}: HeaderProps) => {
  return (
    <div className={"w-full flex flex-col gap-y-4 items-center justify-center"}>
      
      <h1 className={cn(popins.className, 'text-2xl font-semibold')}>
      Auth
      </h1>
      <p className={cn(popins.className, 'text-md text-muted-foreground font-medium')}>
        {label}
      </p>
    </div>
  )
}

export default Header;