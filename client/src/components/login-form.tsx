"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                placeholder="example@example.com"
                type="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-left">
                Password
              </Label>
              <Input id="password" type="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
