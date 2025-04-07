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
    <main className="w-full h-screen bg-slate-600 flex items-center justify-center">
      <section className="grid grid-cols-2 p-6 bg-gray-800 rounded-2xl shadow-2xl gap-8 items-center max-w-6xl">
        <div className="relative">
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
                    className="w-full h-[680px] rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 cursor-pointer border-none text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out" />
            <CarouselNext className="right-4 cursor-pointer border-none text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out" />
          </Carousel>
        </div>
        <Card className=" bg-transparent border-none shadow-none p-6">
          <CardHeader>
            <CardTitle className="text-5xl font-bold text-white">
              Create an account
            </CardTitle>
            <CardDescription className="text-gray-500 mt-4 text-md">
              Already have an account?
              <a href="" className="text-violet-500 underline ml-1">
                Login
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <form action="" className="flex flex-col gap-5">
              <div className="flex gap-4">
                <Input
                  className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-5 py-6"
                  type="text"
                  placeholder="First name"
                />
                <Input
                  className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-5 py-6"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <Input
                className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-5 py-6"
                type="text"
                placeholder="Email"
              />
              <div className="relative">
                <Input
                  className="bg-gray-700 border-none text-white placeholder:text-gray-400 px-5 py-6"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />
                <button
                  type="button"
                  className="absolute right-5 top-3.5 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <div className="flex space-x-2 items-center">
                <Checkbox className="border-2 border-gray-700 cursor-pointer h-5 w-5" />
                <Label className="text-white text-xs">
                  I agree to the
                  <a href="" className="text-violet-500 underline ml-1">
                    Terms & Conditions
                  </a>
                </Label>
              </div>
              <Button className="cursor-pointer bg-violet-500 mt-5 py-6 hover:bg-violet-600">
                Create account
              </Button>
              <div className="flex items-center gap-4">
                <Separator className="w-full border-t-1 border-gray-500 rounded-full" />
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  Or register with
                </span>
                <Separator className="w-full border-t-1 border-gray-500" />
              </div>
              <div className="flex gap-4">
                <Button className="text-white cursor-pointer bg-transparent shadow-none border-1 border-gray-500 flex-1 flex items-center justify-center py-6 hover:bg-violet-500 gap-3">
                <FcGoogle style={{ width: '24px', height: '24px' }} />
                  Google
                </Button>
                <Button className="text-white cursor-pointer bg-transparent shadow-none border-1 border-gray-500 flex-1 flex items-center justify-center py-6 hover:bg-violet-500 gap-3">
                <FaApple style={{ width: '24px', height: '24px' }} />
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
