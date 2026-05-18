import { EmptyState } from "@/components/feedback/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/features/requests/format";
import { USER_ROLE_LABELS_AR, type UserRole } from "@/lib/constants/roles";

type CommentItem = {
  id: string;
  body: string;
  createdAt: Date | string;
  author: {
    name?: string | null;
    email: string;
    role: UserRole;
  };
};

type CommentListProps = {
  comments: CommentItem[];
  title?: string;
  emptyTitle?: string;
};

export function CommentList({
  comments,
  title = "التعليقات",
  emptyTitle = "لا توجد تعليقات بعد"
}: CommentListProps) {
  if (comments.length === 0) {
    return <EmptyState title={emptyTitle} description="ستظهر ملاحظات العميل والفريق هنا بمجرد إضافتها." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-semibold text-bd-text">{comment.author.name ?? comment.author.email}</p>
                <p className="mt-1 text-sm text-bd-muted">{USER_ROLE_LABELS_AR[comment.author.role]}</p>
              </div>
              <p className="text-sm text-bd-muted">{formatDate(comment.createdAt)}</p>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-bd-muted">{comment.body}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
