import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calculator, BookOpen, Building2 } from "lucide-react";

interface University {
  id: string;
  name: string;
  location: string;
  degrees: string[];
  nsfasEligible: boolean;
}

interface Bursary {
  id: string;
  name: string;
  provider: string;
  amount: number;
  criteria: string[];
  requirements: string[];
}

interface PrivateInstitution {
  id: string;
  name: string;
  location: string;
  programs: string[];
  tuitionFee: number;
}

const universities: University[] = [
  {
    id: "1",
    name: "University of Cape Town (UCT)",
    location: "Cape Town",
    degrees: ["BA", "BSc", "BEng", "LLB", "MBChB", "BCom"],
    nsfasEligible: true,
  },
  {
    id: "2",
    name: "Stellenbosch University",
    location: "Stellenbosch",
    degrees: ["BA", "BSc", "BEng", "BCom", "LLB"],
    nsfasEligible: true,
  },
  {
    id: "3",
    name: "University of Witwatersrand",
    location: "Johannesburg",
    degrees: ["BA", "BSc", "BEng", "LLB", "MBChB"],
    nsfasEligible: true,
  },
  {
    id: "4",
    name: "University of KwaZulu-Natal",
    location: "Durban",
    degrees: ["BA", "BSc", "BEng", "BCom", "MBChB"],
    nsfasEligible: true,
  },
  {
    id: "5",
    name: "University of Johannesburg",
    location: "Johannesburg",
    degrees: ["BA", "BSc", "BEng", "BCom"],
    nsfasEligible: true,
  },
  {
    id: "6",
    name: "Rhodes University",
    location: "Grahamstown",
    degrees: ["BA", "BSc", "BEng", "BCom"],
    nsfasEligible: true,
  },
];

const bursaries: Bursary[] = [
  {
    id: "1",
    name: "NSFAS Bursary",
    provider: "National Student Financial Aid Scheme",
    amount: 150000,
    criteria: ["South African Citizen", "Financial Need", "Good Academic Performance"],
    requirements: ["Grade 12 Certificate", "University Admission Letter", "Financial Needs Assessment"],
  },
  {
    id: "2",
    name: "Eskom Bursary",
    provider: "Eskom Holdings SOC Limited",
    amount: 200000,
    criteria: ["Engineering or Science Students", "South African Citizen"],
    requirements: ["Excellent Academic Record", "Commitment to Work for Eskom"],
  },
  {
    id: "3",
    name: "Vodacom Foundation Bursary",
    provider: "Vodacom Foundation",
    amount: 120000,
    criteria: ["Engineering Students", "Financial Need"],
    requirements: ["Bachelor of Engineering in Progress", "Demonstrated Leadership"],
  },
  {
    id: "4",
    name: "Nedbank Bursary",
    provider: "Nedbank Group Limited",
    amount: 180000,
    criteria: ["Business/Finance Students", "Strong Academics"],
    requirements: ["BCom Students", "Internship Commitment"],
  },
];

const privateInstitutions: PrivateInstitution[] = [
  {
    id: "1",
    name: "Regenesys Business School",
    location: "Johannesburg",
    programs: ["MBA", "BCom Honours", "Executive Programs"],
    tuitionFee: 180000,
  },
  {
    id: "2",
    name: "CTI Education Group",
    location: "Johannesburg",
    programs: ["BTech Information Technology", "BTech Engineering"],
    tuitionFee: 120000,
  },
  {
    id: "3",
    name: "University of Pretoria Online",
    location: "Pretoria",
    programs: ["Online Degrees", "Postgraduate Programs"],
    tuitionFee: 95000,
  },
  {
    id: "4",
    name: "IIE MSA",
    location: "Pretoria",
    programs: ["BBA", "BCompt", "Engineering Programs"],
    tuitionFee: 140000,
  },
];

const UniversitiesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDegree = selectedDegree === "all" || !selectedDegree || uni.degrees.includes(selectedDegree);
    return matchesSearch && matchesDegree;
  });

  const allDegrees = Array.from(new Set(universities.flatMap((u) => u.degrees)));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by degree" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Degrees</SelectItem>
            {allDegrees.map((degree) => (
              <SelectItem key={degree} value={degree}>
                {degree}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUniversities.map((uni) => (
          <Card key={uni.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-xl">{uni.name}</CardTitle>
                  <CardDescription>{uni.location}</CardDescription>
                </div>
                {uni.nsfasEligible && (
                  <Badge className="bg-green-600 hover:bg-green-700">NSFAS Eligible</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold text-sm mb-2">Available Degrees:</h4>
                <div className="flex flex-wrap gap-2">
                  {uni.degrees.map((degree) => (
                    <Badge key={degree} variant="secondary">
                      {degree}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No universities found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const APSCalculator = () => {
  const [subjects, setSubjects] = useState<{ [key: string]: number }>({
    Math: 0,
    "English Home Language": 0,
    Biology: 0,
    Chemistry: 0,
    Physics: 0,
    History: 0,
  });

  const subjectWeights = {
    Math: 2,
    "English Home Language": 1,
    Biology: 1,
    Chemistry: 1,
    Physics: 1,
    History: 1,
  };

  const calculateAPS = () => {
    let totalPoints = 0;
    let totalWeight = 0;

    Object.entries(subjects).forEach(([subject, score]) => {
      if (score > 0) {
        const weight = subjectWeights[subject as keyof typeof subjectWeights];
        totalPoints += score * weight;
        totalWeight += weight;
      }
    });

    return totalWeight === 0 ? 0 : Math.round(totalPoints / totalWeight);
  };

  const aps = calculateAPS();

  const handleScoreChange = (subject: string, value: string) => {
    const numValue = Math.min(Math.max(parseInt(value) || 0, 0), 100);
    setSubjects((prev) => ({
      ...prev,
      [subject]: numValue,
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>APS Score Calculator</CardTitle>
          <CardDescription>
            Enter your subject marks (0-100) to calculate your APS score
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Object.entries(subjects).map(([subject, score]) => (
                <div key={subject}>
                  <label className="text-sm font-medium mb-2 block">
                    {subject}
                    {subjectWeights[subject as keyof typeof subjectWeights] === 2 && (
                      <span className="text-red-500 ml-1">(Double Weight)</span>
                    )}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={score || ""}
                    onChange={(e) => handleScoreChange(subject, e.target.value)}
                    placeholder="Enter mark out of 100"
                  />
                </div>
              ))}
            </div>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium mb-2 opacity-90">Your APS Score</p>
                  <p className="text-5xl font-bold mb-4">{aps}</p>
                  <div className="space-y-2 text-sm">
                    <p>APS Score Range: 0-45</p>
                    <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                      <p className="text-xs opacity-75">APS Score Interpretation:</p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>36+: Excellent (University eligible)</li>
                        <li>28-35: Good (Most universities)</li>
                        <li>20-27: Average (Limited options)</li>
                        <li>&lt;20: Below average</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BursariesSection = () => {
  const [selectedBursary, setSelectedBursary] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bursaries.map((bursary) => (
          <Card
            key={bursary.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => setSelectedBursary(selectedBursary === bursary.id ? null : bursary.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{bursary.name}</CardTitle>
              <CardDescription>{bursary.provider}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-primary">
                  R {(bursary.amount / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground">Annual amount</p>
              </div>

              {selectedBursary === bursary.id && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Criteria:</h4>
                    <ul className="space-y-1">
                      {bursary.criteria.map((criterion, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {bursary.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const PrivateInstitutionsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  const filteredInstitutions = privateInstitutions.filter((inst) => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || !selectedProgram || inst.programs.some((p) => p.includes(selectedProgram));
    return matchesSearch && matchesProgram;
  });

  const allPrograms = Array.from(
    new Set(privateInstitutions.flatMap((inst) => inst.programs.map((p) => p.split(" ")[0])))
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by program type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {allPrograms.map((program) => (
              <SelectItem key={program} value={program}>
                {program}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInstitutions.map((inst) => (
          <Card key={inst.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-xl">{inst.name}</CardTitle>
                  <CardDescription>{inst.location}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Programs:</h4>
                <div className="flex flex-wrap gap-2">
                  {inst.programs.map((program) => (
                    <Badge key={program} variant="secondary">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-lg font-bold text-primary">
                  R {(inst.tuitionFee / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground">Annual tuition</p>
              </div>
              <Button className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInstitutions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No institutions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const ReBookedCampus = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ReBooked Campus</h1>
          <p className="text-muted-foreground">
            Your comprehensive guide to universities, bursaries, and educational institutions in South Africa
          </p>
        </div>

        <Tabs defaultValue="universities" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="universities" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Universities</span>
            </TabsTrigger>
            <TabsTrigger value="aps" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">APS Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="bursaries" className="flex items-center gap-2">
              <span className="hidden sm:inline">Bursaries</span>
            </TabsTrigger>
            <TabsTrigger value="private" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Private</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="universities" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">South African Universities</h2>
              <p className="text-muted-foreground">
                Explore public universities across South Africa and their available degree programs
              </p>
            </div>
            <UniversitiesSection />
          </TabsContent>

          <TabsContent value="aps" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">APS Score Calculator</h2>
              <p className="text-muted-foreground">
                Calculate your Admission Point Score to see which universities you're eligible for
              </p>
            </div>
            <APSCalculator />
          </TabsContent>

          <TabsContent value="bursaries" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Available Bursaries</h2>
              <p className="text-muted-foreground">
                Discover bursary opportunities to help fund your education
              </p>
            </div>
            <BursariesSection />
          </TabsContent>

          <TabsContent value="private" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Private Institutions</h2>
              <p className="text-muted-foreground">
                Browse private educational institutions offering various programs
              </p>
            </div>
            <PrivateInstitutionsSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReBookedCampus;
