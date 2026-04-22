import { AtsCvBuilderForm } from '@/components/forms/AtsCvBuilderForm';
import { getCurrentUserOrDemo } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AtsCvBuilderPage() {
  const user = await getCurrentUserOrDemo();

  const initial = user
    ? await prisma.cV.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
    : null;

  return (
    <main className="container-app py-12">
      <AtsCvBuilderForm
        initial={
          initial
            ? {
                fullName: initial.fullName,
                targetRole: initial.targetRole,
                education: initial.education,
                experience: initial.experience,
                skills: initial.skills,
                projects: initial.projects,
                certifications: initial.certifications,
                generatedSummary: initial.generatedSummary,
                generatedSkills: initial.generatedSkills,
                generatedExperience: initial.generatedExperience,
                generatedProjects: initial.generatedProjects,
                generatedEducation: initial.generatedEducation,
                generatedCertifications: initial.generatedCertifications,
                generatedTips: initial.generatedTips
              }
            : null
        }
      />
    </main>
  );
}