"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleSignIn } from "@/action/actions";
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast";

export default function SignInForm() {
  const {toast} = useToast();
const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const res = await handleSignIn(data);
      console.log('hey'+ res);
      if (!res) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your credentials.",
        })
      }
      console.log('hey'+ res);
      // redirect to dashboard
      router.push('/dashboard');
      

      // Handle successful sign-in, e.g., redirect to the dashboard
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your credentials.",
      })
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      
      <Card className="mx-auto max-w-sm pt-5">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account

            For Testing Purpose Use Default Credentials
            <br />
            Email: health@wise.com
            <br />
            Password: health@123
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button className="w-full">Login</Button>

              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
