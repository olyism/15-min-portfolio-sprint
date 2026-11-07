import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60dvh] flex-col items-start justify-center py-24">
      <p className="text-caption font-medium tracking-wide text-fg-subtle uppercase">404</p>
      <h1 className="mt-4 text-display font-semibold">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-lead text-fg-muted">It may have moved, or it never existed. The work is still here.</p>
      <div className="mt-10 flex gap-3">
        <Button href="/">Home</Button>
        <Button href="/projects" variant="secondary">
          See the work
        </Button>
      </div>
    </Container>
  );
}
