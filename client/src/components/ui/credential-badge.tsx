import React from "react";

interface CredentialBadgeProps {
  className?: string;
}

export function CredentialBadge({ className }: CredentialBadgeProps) {
  return (
    <img 
      src="/badge.jpg" 
      alt="Credential Badge" 
      className={className}
      style={{ maxWidth: '150px', height: 'auto' }}
    />
  );
}