import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

// Route path to readable name map (aligned with Figma node 1:473)
const ROUTE_LABEL_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  patients: 'Patient Details',
  records: 'Health Records',
  labs: 'Lab Results',
  ocr: 'OCR Verification',
  upload: 'Upload Document',
  referrals: 'Referrals',
  reports: 'Clinical Reports',
  'treatment-offers': 'Treatment Lifecycle',
  settings: 'Settings',
  notifications: 'Notification Center',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();

  // Derive breadcrumbs from path if items not provided
  const derivedItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0 || (pathSegments.length === 1 && pathSegments[0] === 'dashboard')) {
      return [{ label: 'Dashboard' }];
    }

    const trail: BreadcrumbItem[] = [{ label: 'Dashboard', href: '/dashboard' }];
    let accumulatedPath = '';

    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      const label =
        index === 1 && pathSegments[0] === 'patients'
          ? 'Patient Profile'
          : ROUTE_LABEL_MAP[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

      trail.push({
        label,
        href: isLast ? undefined : accumulatedPath,
      });
    });

    return trail;
  }, [items, location.pathname]);

  if (
    (derivedItems.length <= 1 && derivedItems[0]?.label === 'Dashboard') ||
    location.pathname === '/patients'
  ) {
    return null; // Keep top clean as in Figma nodes 1:154 and 1:6657
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-base font-normal text-[#494552]">
      <ol className="flex items-center gap-2 flex-wrap">
        {derivedItems.map((item, index) => {
          const isLast = index === derivedItems.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="size-4 text-[#494552] shrink-0" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="hover:text-[#191c1d] transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8] rounded px-1 -mx-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-[#191c1d] font-medium' : 'text-[#494552]'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
