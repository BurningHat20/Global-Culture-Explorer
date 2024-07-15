import React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ComparisonModal = ({ countries, open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Country Comparison
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {countries.map(
              (country, index) =>
                country &&
                country.country && (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{country.country}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        {Object.entries(country).map(
                          ([key, value]) =>
                            key !== "country" && (
                              <div key={key}>
                                <dt className="font-semibold">{key}:</dt>
                                <dd>{value}</dd>
                              </div>
                            )
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                )
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
