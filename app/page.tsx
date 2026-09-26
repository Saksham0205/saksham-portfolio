import { LabExperience } from "@/components/experience/LabExperience";
import { Entrance } from "@/components/sections/Entrance";
import { Signal } from "@/components/sections/Signal";
import { OmniDimension } from "@/components/sections/OmniDimension";
import { Spyne } from "@/components/sections/Spyne";
import { Ajnabee } from "@/components/sections/Ajnabee";
import { Lab } from "@/components/sections/Lab";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Record } from "@/components/sections/Record";
import { Contact } from "@/components/sections/Contact";

/**
 * Every room is server-rendered, semantic HTML. The 3D lab is layered behind
 * it by LabExperience, so the whole portfolio reads fine without WebGL.
 */
export default function Home() {
  return (
    <LabExperience>
      <main>
        <Entrance />
        <Signal />
        <OmniDimension />
        <Spyne />
        <Ajnabee />
        <Lab />
        <About />
        <Capabilities />
        <Record />
        <Contact />
      </main>
    </LabExperience>
  );
}
