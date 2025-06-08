import { format } from "date-fns";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  return (
    <div className="animate-fade-from-top">
      {organizations.length > 0 ? (
        <ul className="list-disc pl-10 font-mono">
          {organizations.map((org) => (
            <li key={org.id}>
              Organization name: {org.name}
              <ul className="list-[square] pl-6 last:pb-3">
                <li className="pt-1">
                  Joined at:{" "}
                  {format(org.membershipsByUser.joinedAt, "yyyy-MM-dd, HH:mm")}
                </li>
                <li className="pt-1">Members: {org._count.memberships}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No organizations found.</p>
      )}
    </div>
  );
};

export { OrganizationList };
