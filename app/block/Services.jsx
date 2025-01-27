import services from "@/Static/services";

export default function Services() {
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {services.map((service, index) => (
          <div
            className="service-card p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            key={index}
          >
            <h3 className="text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-400">{service.discription}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
