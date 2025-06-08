import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  return (
    <div>
      {organizations.length > 0 ? (
        <ul className="list-disc pl-10 font-mono">
          {organizations.map((org) => (
            <li key={org.id} className="mb-2">
              {org.name} - Members: {org.memberships.length}
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
