import { useState, useRef } from "react";
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
import { FaApple, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { z } from "zod";
import Moon1 from "../assets/moon-1.jpeg";
import Moon2 from "../assets/moon-2.jpeg";
import Moon3 from "../assets/moon-3.jpeg";
import Logo from "../assets/react.svg";
import { api } from "../services/api";

const userCreateSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  async function createUsers() {
    const userData = {
      firstName: firstName.current?.value,
      lastName: lastName.current?.value,
      email: email.current?.value,
      password: password.current?.value,
    };

    try {
      userCreateSchema.parse(userData);

      if (!isChecked) {
        alert("You must agree to the Terms & Conditions to register.");
        return;
      }

      await api().post("/users", userData);

      alert("Account created");

      if (firstName.current) firstName.current.value = "";
      if (lastName.current) lastName.current.value = "";
      if (email.current) email.current.value = "";
      if (password.current) password.current.value = "";
      setIsChecked(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join(", "));
      } else {
        alert("An unexpected error occurred");
      }
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500">
      <section className="grid w-full max-w-6xl grid-cols-1 items-center gap-6 rounded-2xl bg-slate-800 p-5 shadow-2xl sm:gap-8 lg:grid-cols-2">
        <div className="relative hidden w-full lg:block">
          <div className="absolute top-4 left-4 z-10">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <Button
              type="button"
              className="cursor-pointer rounded-3xl bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              Back to website
              <FaArrowRight />
            </Button>
          </div>
          <Carousel>
            <CarouselContent>
              {[Moon1, Moon2, Moon3].map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="h-[600px] w-full rounded-lg object-cover lg:h-[680px]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 cursor-pointer border-none text-gray-800 transition-colors hover:bg-gray-800 hover:text-white" />
            <CarouselNext className="right-4 cursor-pointer border-none text-gray-800 transition-colors hover:bg-gray-800 hover:text-white" />
          </Carousel>
        </div>
        <Card className="border-none bg-transparent p-4 shadow-none sm:p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white sm:text-5xl">
              Create an account
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-gray-400 sm:mt-4 sm:text-base">
              Already have an account?
              <a
                href="#"
                className="ml-1 text-violet-700 underline transition-colors hover:text-violet-800"
              >
                Login
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2 sm:mt-4">
            <form className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Input
                  className="h-12 border-none bg-gray-700 px-4 py-3 text-white placeholder:text-gray-400 sm:py-4"
                  type="text"
                  placeholder="First name"
                  ref={firstName}
                  maxLength={50}
                />
                <Input
                  className="h-12 border-none bg-gray-700 px-4 py-3 text-white placeholder:text-gray-400 sm:py-4"
                  type="text"
                  placeholder="Last name"
                  ref={lastName}
                  maxLength={50}
                />
              </div>
              <Input
                className="h-12 border-none bg-gray-700 px-4 py-3 text-white placeholder:text-gray-400 sm:py-4"
                type="email"
                placeholder="Email"
                ref={email}
                maxLength={50}
              />
              <div className="relative">
                <Input
                  className="h-12 border-none bg-gray-700 px-4 py-3 text-white placeholder:text-gray-400 sm:py-4"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  ref={password}
                  maxLength={6}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
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
                  className="h-5 w-5 cursor-pointer border-2 border-gray-700"
                  checked={isChecked}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="terms"
                  className="text-xs leading-none text-white sm:text-sm"
                >
                  I agree to the
                  <a
                    href="#"
                    className="ml-1 text-violet-700 underline transition-colors hover:text-violet-800"
                  >
                    Terms & Conditions
                  </a>
                </Label>
              </div>
              <Button
                type="button"
                onClick={createUsers}
                className="mt-3 cursor-pointer bg-violet-700 py-6 transition-colors hover:bg-violet-800 sm:mt-5 sm:py-6"
              >
                Create account
              </Button>
              <div className="flex items-center gap-3 sm:gap-4">
                <Separator className="flex-1 border-t border-gray-600" />
                <span className="text-xs whitespace-nowrap text-gray-400">
                  Or register with
                </span>
                <Separator className="flex-1 border-t border-gray-600" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-3 border-gray-600 bg-transparent py-4 text-white transition-colors hover:bg-violet-700 hover:text-white sm:py-6"
                >
                  <FcGoogle style={{ width: "24px", height: "24px" }} />
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-3 border-gray-600 bg-transparent py-4 text-white transition-colors hover:bg-violet-700 hover:text-white sm:py-6"
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
