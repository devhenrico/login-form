import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import Mountain from "./assets/mountain.jpg";
import Logo from "./assets/react.svg";
import { useState } from "react";

export function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="w-full min-h-screen bg-slate-600 flex items-center justify-center p-4">
      <section className="grid grid-cols-1 lg:grid-cols-2 p-4 sm:p-6 bg-gray-800 rounded-2xl shadow-2xl gap-6 sm:gap-8 items-center max-w-6xl w-full">
        <div className="relative w-full hidden lg:block">
          <div className="absolute top-4 left-4 z-10">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <Carousel>
            <CarouselContent>
              {[1, 2, 3].map((_, index) => (
                <CarouselItem key={index}>
                  <img
                    src={Mountain}
                    alt="Mountain view"
                    className="w-full h-[600px] lg:h-[680px] rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 cursor-pointer border-none text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out" />
            <CarouselNext className="right-4 cursor-pointer border-none text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out" />
          </Carousel>
        </div>
        <Card className="bg-transparent border-none shadow-none p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-5xl md:text-5xl font-bold text-white">
              Create an account
            </CardTitle>
            <CardDescription className="text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base">
              Already have an account?
              <a
                href="#"
                className="text-violet-500 underline ml-1 hover:text-violet-400"
              >
                Login
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2 sm:mt-4">
            <form className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Input
                  className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-4 py-3 sm:py-4 h-12"
                  type="text"
                  placeholder="First name"
                />
                <Input
                  className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-4 py-3 sm:py-4 h-12"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <Input
                className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-4 py-3 sm:py-4 h-12"
                type="email"
                placeholder="Email"
              />
              <div className="relative">
                <Input
                  className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-4 py-3 sm:py-4 h-12"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="border-2 border-gray-700 cursor-pointer h-5 w-5"
                />
                <Label
                  htmlFor="terms"
                  className="text-white text-xs sm:text-sm leading-none"
                >
                  I agree to the
                  <a
                    href="#"
                    className="text-violet-500 underline ml-1 hover:text-violet-400"
                  >
                    Terms & Conditions
                  </a>
                </Label>
              </div>
              <Button
                type="submit"
                className="cursor-pointer bg-violet-500 mt-3 sm:mt-5 py-6 sm:py-6 hover:bg-violet-600 transition-colors"
              >
                Create account
              </Button>
              <div className="flex items-center gap-3 sm:gap-4">
                <Separator className="flex-1 border-t border-gray-600" />
                <span className="text-gray-400 text-xs whitespace-nowrap">
                  Or register with
                </span>
                <Separator className="flex-1 border-t border-gray-600" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  className="text-white hover:text-white bg-transparent cursor-pointer border-gray-600 flex-1 flex items-center justify-center py-4 sm:py-6 hover:bg-violet-500 gap-3 transition-colors"
                >
                  <FcGoogle style={{ width: "24px", height: "24px" }} />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="text-white hover:text-white bg-transparent cursor-pointer border-gray-600 flex-1 flex items-center justify-center py-4 sm:py-6 hover:bg-violet-500 gap-3 transition-colors"
                >
                  <FaApple style={{ width: "24px", height: "24px" }} />
                  Apple
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
