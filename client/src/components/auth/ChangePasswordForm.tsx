import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(5, "Password must be at least 6 characters"),
    newPassword: z.string().min(5, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (values: ChangePasswordValues) => {
    try {
      // Add your password change logic here
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-96 items-center gap-4"
          >
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPasswords.oldPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => togglePasswordVisibility("oldPassword")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.oldPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPasswords.newPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => togglePasswordVisibility("newPassword")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.newPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={
                            showPasswords.confirmPassword ? "text" : "password"
                          }
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.confirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Change Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
