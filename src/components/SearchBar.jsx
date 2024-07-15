import React from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";

const SearchBar = ({ onSearch }) => {
  const form = useForm({
    defaultValues: {
      query: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (data.query.trim()) {
      onSearch(data.query.trim());
      form.reset();
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2"
      >
        <div className="relative flex-grow">
          <Input
            {...form.register("query")}
            placeholder="Search for a country..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
