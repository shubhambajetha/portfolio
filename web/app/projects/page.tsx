import FifthSection from "../components/homepage/FifthSection";
import { getalllistings } from "../services/productapi";

// Project data is supplied by the API, which may not be running during build.
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const response = await getalllistings();
  return <FifthSection projectdata={response.data ?? []} />;
}
