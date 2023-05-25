/* 
attributes 数据结构:{
  a_Position: {
    size: 3,
    index:0
  }
}
uniforms 数据结构:{
  u_Color: {
    type: 'uniform1f',
    value:1
  },
}
maps 数据结构:{
  u_Sampler:{
    image,
    format,
    wrapS,
    wrapT,
    magFilter,
    minFilter
  },
}
*/
const defAttr = () => ({
  gl: null,
  type: 'POINTS',
  source: [],
  sourceSize: 0,
  elementBytes: 4,
  categorySize: 0,
  attributes: {},
  uniforms: {},
  maps: {}
})
export default class Poly{
  constructor(attr){
    Object.assign(this, defAttr(), attr)
    this.init()
  }
  init(){
    if (!this.gl) { return }
    this.calculateSize()
    this.updateAttribute();
    this.updateUniform();
    this.updateMaps()
  }
  calculateSize() {
    const {attributes, elementBytes,source } = this
    let categorySize = 0
    Object.values(attributes).forEach(ele => {
      const { size, index } = ele
      categorySize += size
      ele.byteIndex=index*elementBytes
    })
    this.categorySize = categorySize
    this.categoryBytes=categorySize*elementBytes
    this.sourceSize = source.length / categorySize
  }
  updateAttribute() {
    const { gl, attributes, categoryBytes, source } = this
    // 创建缓冲区对象
    const sourceBuffer = gl.createBuffer();
    // 将数据绑定至缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, sourceBuffer);
    // 相缓冲区对象中的变量写入数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(source), gl.STATIC_DRAW)
    // 
    for (let [key, { size, byteIndex }] of Object.entries(attributes)) {
      // 获取 attribute 导出的变量
      const attr = gl.getAttribLocation(gl.program, key)
      // 将缓冲区对象分配给attribute变量
      gl.vertexAttribPointer(
        attr,
        size,
        gl.FLOAT,
        false,
        categoryBytes,
        byteIndex
      )
      // 开启顶点数据的批处理功能
      gl.enableVertexAttribArray(attr)
    }
  }
  updateUniform() {
    const {gl,uniforms}=this
    for (let [key, val] of Object.entries(uniforms)) {
      const { type, value } = val
      const u = gl.getUniformLocation(gl.program, key)
      if (type.includes('Matrix')) {
        gl[type](u,false,value)
      } else {
        gl[type](u,value)
      }
    }
  }
  updateMaps() {
    const { gl, maps } = this
    Object.entries(maps).forEach(([key, val], ind) => {
      const {
        format = gl.RGB,
        image,
        wrapS,
        wrapT,
        magFilter,
        minFilter
      } = val

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.activeTexture(gl[`TEXTURE${ind}`])
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        format,
        format,
        gl.UNSIGNED_BYTE,
        image
      )

      wrapS&&gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        wrapS
      )
      wrapT&&gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        wrapT
      )

      magFilter&&gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        magFilter
      )

      if (!minFilter || minFilter > 9729) {
        gl.generateMipmap(gl.TEXTURE_2D)
      }

      minFilter&&gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          minFilter
        )

      const u = gl.getUniformLocation(gl.program, key)
      gl.uniform1i(u, ind)
    })
  }
  draw(type = this.type) {
    const { gl, sourceSize } = this
    gl.drawArrays(gl[type],0,sourceSize);
  }
}