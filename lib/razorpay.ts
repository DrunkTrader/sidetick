export type RazorpayOrderInput = {
  amount: number;
  courseId: string;
  userId?: string;
};

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: "INR";
  notes: {
    courseId: string;
    userId: string;
  };
};

export function createReceiptOrder(input: RazorpayOrderInput): RazorpayOrder {
  return {
    id: crypto.randomUUID(),
    amount: input.amount * 100,
    currency: "INR",
    notes: {
      courseId: input.courseId,
      userId: input.userId ?? "new_user",
    },
  };
}
