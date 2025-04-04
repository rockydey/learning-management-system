import Image from "next/image";
import facebookIcon from "@/assets/Home/facebook.png";
import instagramIcon from "@/assets/Home/instagram.png";
import linkedInIcon from "@/assets/Home/linkedin.png";

const instructors = [
  {
    name: "Alok Kumar Saha",
    image: "https://i.ibb.co/hCsWc0x/teacher2.jpg",
    designation: "Teacher",
  },
  {
    name: "Farzana Yasmin",
    image:
      "https://i.ibb.co/NWvtKRv/tessa-edmiston-1-Kui-Luha2a-U-unsplash.jpg",
    designation: "Teacher",
  },
  {
    name: "Rocky Dey",
    image: "https://i.ibb.co/P9fq2dg/alex-suprun-ZHv-M3-XIOHo-E-unsplash.jpg",
    designation: "Teacher",
  },
  {
    name: "Benu S David",
    image: "https://i.ibb.co/hCsWc0x/teacher2.jpg",
    designation: "Teacher",
  },
];

function Instructors() {
  return (
    <div className="max-w-7xl mx-auto px-5 xl:px-0 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold josefin capitalize">
          Our Skilled Instructors
        </h2>
        <p className="text-base font-medium max-w-2xl mx-auto">
          Here you will have the team of experts from multifarious industries
          you will learn from them under their experience and ethical guidance
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5">
        {instructors.map((instructor) => (
          <div
            key={instructor.name}
            className="border rounded-lg border-gray-300"
          >
            <div className="w-60 h-60">
              <Image
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-full object-cover rounded-t-lg"
                width={200}
                height={200}
              />
            </div>

            <div className="text-center py-5 space-y-2">
              <h3 className="text-xl font-bold text-secondary">
                {instructor.name}
              </h3>
              <p className="text-base font-medium">{instructor.designation}</p>
            </div>

            <div className="border-t border-gray-300 py-3 flex items-center justify-center gap-5">
              <Image
                src={facebookIcon}
                alt="facebook Icon"
                className="w-6 h-6 object-cover cursor-pointer"
              />
              <Image
                src={instagramIcon}
                alt="instagram Icon"
                className="w-6 h-6 object-cover cursor-pointer"
              />
              <Image
                src={linkedInIcon}
                alt="linkedin Icon"
                className="w-6 h-6 object-cover cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Instructors;
