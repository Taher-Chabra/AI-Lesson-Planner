import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ArrowRight, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const { isUser } = useAuth();
  return (
    <nav className="bg-transparent mt-1">
      <div className="flex flex-wrap items-center justify-between p-2 border-b-2 border-gray-200">
        <Link 
        to="/" 
        className="text-lg font-extrabold"
        >
          LessonPlanner
        </Link>
        
        <div>
          <ThemeToggle />
          { isUser ?
            (
              <Avatar>
                <AvatarFallback>
                  <UserRound className="size-3.5"/>
                </AvatarFallback>
              </Avatar>
            )
            :
            (
              <Link 
              to="/login"
              className="ml-8"
              >
                <span>
                Login
                <ArrowRight className="inline ml-0.5 mb-1 size-4" />
                </span>
              </Link>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
