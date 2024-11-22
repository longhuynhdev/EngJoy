import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const ForbiddenPage403 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mx-auto">
            <Shield className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-center pt-4 text-3xl font-bold">
            403
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl font-semibold">Access Forbidden</p>
          <p className="text-muted-foreground mt-2">
            Sorry, you don't have permission to access this page.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            asChild
            className="w-32 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Link to="/">Return to home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ForbiddenPage403;
