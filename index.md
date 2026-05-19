
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proyecto Metamorfosis • Conscious Silk Bespoke Garments</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body { font-family: 'Georgia', serif; }
    .hero-bg { background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://i.imgur.com/YOUR-HERO-IMG-8581.jpg') center/cover no-repeat; }
    .product-card { transition: all 0.3s ease; }
    .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); }
  </style>
</head>
<body class="bg-[#f8f1e3] text-[#3f2a1e]">

  <!-- NAV -->
  <nav class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-light tracking-widest">METAMORFOSIS</h1>
      </div>
      <div class="hidden md:flex gap-8 text-sm uppercase tracking-widest">
        <a href="metamorfosis.html" class="hover:text-[#c19a6b]">Colección</a>
        <a href="#story" class="hover:text-[#c19a6b]">Nuestra Historia</a>
        <a href="#valores" class="hover:text-[#c19a6b]">Valores</a>
        <a href="#bespoke" class="hover:text-[#c19a6b]">Bespoke</a>
      </div>
      <a href="#contact" class="bg-[#c19a6b] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#a67c4f]">Contáctanos</a>
    </div>
  </nav>

  <!-- HERO - Boutique style -->
  <header class="hero-bg h-screen flex items-center text-white">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <p class="uppercase tracking-[3px] text-sm mb-4">Conscious • Indian Silk • Bespoke</p>
      <h1 class="text-6xl md:text-7xl font-light leading-none mb-6">Transforma tu esencia</h1>
      <p class="text-xl md:text-2xl max-w-lg mx-auto mb-10">Seda india consciente. Prendas únicas hechas a medida. Elegancia que honra el alma y la tierra.</p>
      <a href="metemorfosis.html" class="inline-block bg-white text-[#3f2a1e] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#e8d5b7]">Explorar la colección</a>
    </div>
  </header>

  <!-- YOUR PHOTOS -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
    <img src="https://i.imgur.com/YOUR-IMG-8581.jpg" alt="Hombre con camisa de seda paisley verde en jardín" class="w-full h-full object-cover">
    <img src="https://i.imgur.com/YOUR-IMG-8582.jpg" alt="Sonriendo con camisa de seda paisley" class="w-full h-full object-cover">
  </div>

  <!-- SHOP / FEATURED PRODUCTS -->
  <section id="shop" class="max-w-7xl mx-auto px-6 py-20">
    <h2 class="text-4xl font-light text-center mb-12">Tesoros de Seda</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <!-- Replace these with your real products later -->
      <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm">
        <img src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d74?w=800" alt="Camisa de seda paisley verde" class="w-full h-80 object-cover">
        <div class="p-6">
          <h3 class="font-medium">Signature Paisley Camp Shirt</h3>
          <p class="text-[#c19a6b] text-sm">Seda ligera • Hecha a mano • India</p>
          <p class="text-xs mt-4">Bespoke • Desde €145</p>
        </div>
      </div>

      <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm">
        <img src="https://images.pexels.com/photos/1049317/pexels-photo-1049317.jpeg?w=800" alt="Kurta de seda floral" class="w-full h-80 object-cover">
        <div class="p-6">
          <h3 class="font-medium">Vibrant Festival Kurta</h3>
          <p class="text-[#c19a6b] text-sm">Seda block-print • Energética</p>
          <p class="text-xs mt-4">Bespoke • Desde €185</p>
        </div>
      </div>

      <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm">
        <img src="https://images.unsplash.com/photo-1610030469983-8a4d8b6c7d2a?w=800" alt="Camisa boho seda" class="w-full h-80 object-cover">
        <div class="p-6">
          <h3 class="font-medium">Boho Silk Button-Up</h3>
          <p class="text-[#c19a6b] text-sm">Flujo sagrado de paisleys</p>
          <p class="text-xs mt-4">Bespoke • Desde €165</p>
        </div>
      </div>

      <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm">
        <img src="https://images.pexels.com/photos/8275685/pexels-photo-8275685.jpeg?w=800" alt="Conjunto kurta y chaleco" class="w-full h-80 object-cover">
        <div class="p-6">
          <h3 class="font-medium">Bespoke Kurta + Waistcoat</h3>
          <p class="text-[#c19a6b] text-sm">Para ceremonias y retiros</p>
          <p class="text-xs mt-4">Hecho a tu medida • Desde €290</p>
        </div>
      </div>
    </div>
  </section>

  <!-- STORY -->
  <section id="story" class="bg-[#e8d5b7] py-20">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <h2 class="text-4xl font-light mb-8">Bienvenidos a Metemorfosis</h2>
      <p class="text-lg leading-relaxed">Creamos prendas de seda india conscientemente sourced, cada una es una transformación wearable. Un puente entre antiguas tradiciones textiles y la vida consciente moderna.</p>
      <p class="mt-8 italic">— Seda que honra al gusano, al artesano y a tu esencia.</p>
    </div>
  </section>

  <!-- VALORES -->
  <section id="valores" class="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
    <div class="text-center">
      <i class="fa-solid fa-leaf text-4xl mb-6 text-[#c19a6b]"></i>
      <h3 class="text-xl mb-3">Sourcing Consciente</h3>
      <p class="text-sm">Seda ética, sin crueldad, con artesanos de India.</p>
    </div>
    <div class="text-center">
      <i class="fa-solid fa-hands-holding-circle text-4xl mb-6 text-[#c19a6b]"></i>
      <h3 class="text-xl mb-3">Artesanía Única</h3>
      <p class="text-sm">Block-print a mano, patrones sagrados, piezas limitadas.</p>
    </div>
    <div class="text-center">
      <i class="fa-solid fa-ruler-combined text-4xl mb-6 text-[#c19a6b]"></i>
      <h3 class="text-xl mb-3">Bespoke para ti</h3>
      <p class="text-sm">Hecho a tu medida, con tu intención y energía.</p>
    </div>
  </section>

  <!-- BESPOKE CTA -->
  <section id="bespoke" class="bg-[#3f2a1e] text-white py-20 text-center">
    <div class="max-w-2xl mx-auto px-6">
      <h2 class="text-4xl font-light mb-6">¿Quieres una prenda única?</h2>
      <p class="mb-10">Diseñamos y confeccionamos tu camisa, kurta o conjunto según tus medidas y visión. Una prenda que se convierta en tu segunda piel.</p>
      <a href="#contact" class="inline-flex items-center gap-3 bg-[#c19a6b] text-white px-10 py-4 rounded-3xl hover:bg-[#a67c4f]">
        <span class="text-lg">Solicitar mi pieza bespoke</span>
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="max-w-2xl mx-auto px-6 py-20">
    <h2 class="text-3xl text-center mb-10">Hablemos de seda</h2>
    <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST" class="space-y-6">
      <input type="email" name="email" placeholder="Tu correo" required class="w-full px-6 py-4 border border-[#c19a6b]/30 rounded-2xl focus:outline-none focus:border-[#c19a6b]">
      <textarea name="message" rows="5" placeholder="Cuéntanos tu visión..." class="w-full px-6 py-4 border border-[#c19a6b]/30 rounded-2xl focus:outline-none focus:border-[#c19a6b]"></textarea>
      <button type="submit" class="w-full bg-[#c19a6b] text-white py-5 rounded-3xl font-medium text-lg">Enviar mensaje</button>
    </form>
  </section>

  <footer class="bg-[#3f2a1e] text-[#e8d5b7] py-12 text-center text-sm">
    <p>© 2026 Proyecto Metamorfosis • Seda consciente • Hecho con amor y seda</p>
    <p class="mt-2">Transform yourself through conscious clothing.</p>
  </footer>

  <script>
    // Tailwind script already loaded
    console.log('%c✅ Metemorfosis site upgraded to Boutique style!', 'color:#c19a6b; font-family:monospace');
  </script>
</body>
</html>
