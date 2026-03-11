import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { AIImproveButton } from "./AIImproveButton";

interface BudgetData {
  expenseCategories: { category: string; amount: string; notes: string }[];
  totalBudget: string;
  fundingSources: string;
  contingencyPlan: string;
}

interface StepBudgetProps {
  data: BudgetData;
  onChange: (data: BudgetData) => void;
  labels: {
    expenseCategories: string;
    expenseCategoriesDescription: string;
    categoryName: string;
    categoryNamePlaceholder: string;
    estimatedAmount: string;
    estimatedAmountPlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    addExpense: string;
    removeExpense: string;
    totalBudget: string;
    totalBudgetPlaceholder: string;
    fundingSources: string;
    fundingSourcesPlaceholder: string;
    contingencyPlan: string;
    contingencyPlanPlaceholder: string;
  };
}

export function StepBudget({ data, onChange, labels }: StepBudgetProps) {
  const addExpense = () => {
    onChange({
      ...data,
      expenseCategories: [
        ...data.expenseCategories,
        { category: "", amount: "", notes: "" },
      ],
    });
  };

  const removeExpense = (index: number) => {
    const updated = data.expenseCategories.filter((_, i) => i !== index);
    onChange({ ...data, expenseCategories: updated });
  };

  const updateExpense = (
    index: number,
    field: "category" | "amount" | "notes",
    value: string
  ) => {
    const updated = data.expenseCategories.map((expense, i) =>
      i === index ? { ...expense, [field]: value } : expense
    );
    onChange({ ...data, expenseCategories: updated });
  };

  return (
    <div className="space-y-6">
      {/* Total Budget */}
      <div className="space-y-2">
        <Label htmlFor="totalBudget">{labels.totalBudget}</Label>
        <Input
          id="totalBudget"
          type="number"
          value={data.totalBudget}
          onChange={(e) => onChange({ ...data, totalBudget: e.target.value })}
          placeholder={labels.totalBudgetPlaceholder}
        />
      </div>

      {/* Expense Categories */}
      <div className="space-y-4">
        <div>
          <Label>{labels.expenseCategories}</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {labels.expenseCategoriesDescription}
          </p>
        </div>

        {data.expenseCategories.map((expense, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 bg-muted/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`category-${index}`}>
                    {labels.categoryName}
                  </Label>
                  <AIImproveButton
                    currentValue={expense.category}
                    fieldContext="Expense category name - type of expense for the campaign"
                    onAccept={(value) => updateExpense(index, "category", value)}
                  />
                </div>
                <Input
                  id={`category-${index}`}
                  value={expense.category}
                  onChange={(e) =>
                    updateExpense(index, "category", e.target.value)
                  }
                  placeholder={labels.categoryNamePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`amount-${index}`}>
                  {labels.estimatedAmount}
                </Label>
                <Input
                  id={`amount-${index}`}
                  value={expense.amount}
                  onChange={(e) =>
                    updateExpense(index, "amount", e.target.value)
                  }
                  placeholder={labels.estimatedAmountPlaceholder}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`notes-${index}`}>{labels.notes}</Label>
                <AIImproveButton
                  currentValue={expense.notes}
                  fieldContext="Expense notes - additional details about this expense"
                  onAccept={(value) => updateExpense(index, "notes", value)}
                />
              </div>
              <Input
                id={`notes-${index}`}
                value={expense.notes}
                onChange={(e) => updateExpense(index, "notes", e.target.value)}
                placeholder={labels.notesPlaceholder}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeExpense(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {labels.removeExpense}
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addExpense}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {labels.addExpense}
        </Button>
      </div>

      {/* Funding Sources */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="fundingSources">{labels.fundingSources}</Label>
          <AIImproveButton
            currentValue={data.fundingSources}
            fieldContext="Funding sources - where the campaign budget will come from"
            onAccept={(value) => onChange({ ...data, fundingSources: value })}
          />
        </div>
        <Textarea
          id="fundingSources"
          value={data.fundingSources}
          onChange={(e) => onChange({ ...data, fundingSources: e.target.value })}
          placeholder={labels.fundingSourcesPlaceholder}
          rows={3}
        />
      </div>

      {/* Contingency Plan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="contingencyPlan">{labels.contingencyPlan}</Label>
          <AIImproveButton
            currentValue={data.contingencyPlan}
            fieldContext="Contingency plan - backup plan if budget runs short"
            onAccept={(value) => onChange({ ...data, contingencyPlan: value })}
          />
        </div>
        <Textarea
          id="contingencyPlan"
          value={data.contingencyPlan}
          onChange={(e) =>
            onChange({ ...data, contingencyPlan: e.target.value })
          }
          placeholder={labels.contingencyPlanPlaceholder}
          rows={3}
        />
      </div>
    </div>
  );
}
